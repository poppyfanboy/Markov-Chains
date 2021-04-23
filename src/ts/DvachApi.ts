import { decode } from 'html-entities';

import { DvachPostModel } from '@models/DvachPostModel';

const DEFAULT_CORS_PROXY_URL = new URL('https://cors-proxy.poppyfanboy.workers.dev/');
const DVACH_DOMAINS = [ '2ch.hk', '2ch.pm', '2ch.re' ];

// JSON Types definitions
type PostJson = {
    comment: string;
    name: string;
    num: string;
    trip: string;
};

type ThreadJson = {
    comment: string;
    num: string;
};

type ThreadsListJson = {
    board: string;
    threads: ThreadJson[];
};

// Dvach API URLs
function getThreadsApiUrl(board: string, corsProxy?: URL): URL {
    const targetUrl = `https://2ch.hk/${board}/threads.json`;
    if (corsProxy == null) {
        return new URL(targetUrl);
    }
    const proxiedUrl = new URL(corsProxy.toString());
    proxiedUrl.search = targetUrl;
    return proxiedUrl;
}

function getPostsListApiUrl(board: string, threadNum: string, corsProxy?: URL): URL {
    const targetUrl = `https://2ch.hk/makaba/mobile.fcgi?task=get_thread&board=${board}&thread=${threadNum}&post=1`;
    if (corsProxy == null) {
        return new URL(targetUrl);
    }
    const proxiedUrl = new URL(corsProxy.toString());
    proxiedUrl.search = targetUrl;
    return proxiedUrl;
}

function getPostApiUrl(board: string, postNum: string, corsProxy?: URL): URL {
    const targetUrl = `https://2ch.hk/makaba/mobile.fcgi?task=get_post&board=${board}&post=${postNum}`;
    if (corsProxy == null) {
        return new URL(targetUrl);
    }
    const proxiedUrl = new URL(corsProxy.toString());
    proxiedUrl.search = targetUrl;
    return proxiedUrl;
}

// Helper functions
function formatPostText(text: string) {
    // replace <br /> with new lines
    let formattedText = text.replace(/<br[^>]*\/?>/gi, '\n');
    // remove links (anchor tags with their contents; these will include
    // replies to posts >>12345678)
    formattedText = formattedText.replace(/<a[^>]*>.*?<\/a[^>]*>/gi, '');
    // remove any other tags preserving their contents
    formattedText = formattedText.replace(/<\/?[^>]+>/g, '');
    // decode HTML entities
    formattedText = decode(formattedText);
    // remove repeating whitespace characters, remove leading/trailing
    // whitespaces
    formattedText = formattedText.replace(/\s\s/g, ' ');
    formattedText = formattedText.trim();

    return formattedText;
}

function containsUrlWithDomain(str: string, ...domains: string[]): URL[] {
    const urls: URL[] = [];

    if (domains.length == 0) {
        return urls;
    }

    const urlRegex = /(?:https?:\/\/)?(?:www\.)?([-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6})\b[-a-zA-Z0-9@:%_+.~#?&/=]*/gi;
    let match = urlRegex.exec(str);
    do {
        if (match == null) {
            return urls;
        }
        const currentDomain = match?.[1];
        if (domains.find(domain => domain == currentDomain) != null) {
            let stringUrl = match[0];
            if (!(/^https?:\/\//i).test(stringUrl)) {
                stringUrl = `https://${stringUrl}`;
            }
            urls.push(new URL(stringUrl));
        }
    } while ((match = urlRegex.exec(str)) != null);

    return urls;
}

// Functions that actually retrieve stuff from dvach API
export async function getSinglePost(board: string, postNum: string): Promise<DvachPostModel> {
    const postRequestUrl = getPostApiUrl(board, postNum, DEFAULT_CORS_PROXY_URL);
    const postResponse = await fetch(postRequestUrl.toString(), {
        method: 'GET',
        mode: 'cors',
    });

    console.log(postRequestUrl.toString());
    if (!postResponse.ok) {
        throw new Error(`Ошибка при загрузке поста ${board}/${postNum}`);
    }
    const post: PostJson[] = await postResponse.json();

    return new DvachPostModel(post[0].name, post[0].trip, post[0].comment);
}

export async function getPostsFromThread(
    board: string,
    threadNum: string,
    postsLimit?: number,
): Promise<DvachPostModel[]> {
    postsLimit = Math.max(0, postsLimit ?? 0);

    const posts: DvachPostModel[] = [];
    const postsListRequestUrl = getPostsListApiUrl(board, threadNum, DEFAULT_CORS_PROXY_URL);
    const postsListResponse = await fetch(postsListRequestUrl.toString(), {
        method: 'GET',
        mode: 'cors',
    });
    if (!postsListResponse.ok) {
        throw new Error(`Ошибка при загрузке постов из треда ${board}/${threadNum}.`);
    }
    const postsListJson: PostJson[] = await postsListResponse.json();

    for (const post of postsListJson) {
        if (posts.length >= postsLimit) {
            return posts;
        }
        posts.push(new DvachPostModel(post.name, post.trip, formatPostText(post.comment)));
    }

    return posts;
}

export async function getPostsFromBoard(
    board: string,
    postsLimit?: number,
): Promise<DvachPostModel[]> {
    postsLimit = Math.max(0, postsLimit ?? 0);

    const threadsRequestUrl = getThreadsApiUrl(board, DEFAULT_CORS_PROXY_URL);
    const threadsResponse = await fetch(threadsRequestUrl.toString(), {
        method: 'GET',
        mode: 'cors',
    });
    if (!threadsResponse.ok) {
        throw new Error(`Ошибка при загрузке тредов с доски /${board}/.`);
    }
    const threadsJson: ThreadsListJson = await threadsResponse.json();

    const posts: DvachPostModel[] = [];
    for (const thread of threadsJson.threads) {
        if (postsLimit - posts.length <= 0) {
            break;
        }
        posts.push(...await getPostsFromThread(board, thread.num, postsLimit - posts.length));
    }

    return posts;
}

export async function getPosts(str: string, postsLimit?: number): Promise<DvachPostModel[]> {
    const urls: URL[] = containsUrlWithDomain(str, ...DVACH_DOMAINS);
    if (urls.length == 0) {
        return [];
    }

    for (const url of urls) {
        let path = url.pathname;
        if (path.endsWith('/')) {
            path = path.slice(0, -1);
        }
        const pathItems = path.substr(1).split('/');

        if (pathItems.length == 1) {
            if (pathItems[0] == '') {
                continue;
            }

            return await getPostsFromBoard(pathItems[0], postsLimit);
        }

        if (pathItems.length == 3) {
            const hash = url.hash;
            if (!(pathItems[1] == 'res' && (/^\d+.html$/i).test(pathItems[2]))) {
                continue;
            }
            if (hash.length == 0 || !(/^#\d+$/).test(hash)) {
                return await getPostsFromThread(
                    pathItems[0],
                    pathItems[2].split('.')[0],
                    postsLimit,
                );
            }
            if ((/^#\d+$/).test(hash)) {
                return [ await getSinglePost(pathItems[0], hash.substr(1)) ];
            }
        }
    }

    throw new Error('В строке нет ни одной валидной ссылки на двач.');
}

import './markov-chains-app.pcss';

import React, { useState } from 'react';
import { observer } from 'mobx-react';

import TextSource from '@components/text-source-item/TextSource';
import GenerationSettings from '@components/generation-settings/GenerationSettings';
import { TextSourceModel } from '@model/TextSourceModel';

const MarkovChainsApp: React.FunctionComponent = observer(() => {
    const [ textSource ] = useState(new TextSourceModel());

    return (
        <React.Fragment>
            <header className="markov-chains-app__header">
                <h1 className="markov-chains-app__heading">Цепи Маркова</h1>
            </header>

            <main className="markov-chains-app__main-content">
                <div className="markov-chains-app__generated-text-block">*Сгенерированный текст*</div>

                <section className="markov-chains-app__main-controls-section">
                    <h2 className="markov-chains-app__main-controls-heading">Настройки генерации</h2>
                    <div className="markov-chains-app__generate-text-block">
                        <button className="markov-chains-app__generate-text-button">
                            Сгенерировать текст
                        </button>
                    </div>
                    <GenerationSettings />
                </section>

                <section className="markov-chains-app__text-sources-section">
                    <h2 className="markov-chains-app__text-sources-heading">Список источников</h2>
                    <ul className="markov-chains-app__text-sources-list">
                        <TextSource textSource={textSource} />
                    </ul>
                    <div className="markov-chains-app__add-new-text-source">
                        <button className="markov-chains-app__add-new-text-source-button">
                            Добавить источник
                        </button>
                    </div>
                </section>
            </main>

            <footer className="markov-chains-app__footer">
                <div className="markov-chains-app__help-block">
                    Какая-то информация в футере, не знаю.
                </div>
            </footer>
        </React.Fragment>
    );
});

export default MarkovChainsApp;

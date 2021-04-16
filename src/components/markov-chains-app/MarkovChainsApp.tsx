import './markov-chains-app.pcss';

import React, { useState } from 'react';
import { observer } from 'mobx-react';

import GenerationSettings from '@components/generation-settings/GenerationSettings';
import { TextSourcesListModel } from '@model/TextSourcesListModel';
import TextSourcesList from '@components/text-sources-list/TextSourcesList';

const MarkovChainsApp: React.FunctionComponent = observer(() => {
    const [ textSourcesListModel ] = useState(new TextSourcesListModel(0.01));

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

                <TextSourcesList model={textSourcesListModel} />
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

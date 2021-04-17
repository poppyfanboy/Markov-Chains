import './markov-chains-app.pcss';

import React, { createContext, useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import GenerationSettings from '@components/generation-settings/GenerationSettings';
import TextSourcesList from '@components/text-sources-list/TextSourcesList';
import { AppModel } from '@model/AppModel';

export const AppContext = createContext<AppModel | null>(null);

const MarkovChainsApp: React.FunctionComponent = observer(() => {
    const [ appModel ] = useState(new AppModel());

    const onGenerateButtonClick = useCallback(
        action(() => {
            appModel.generateText();
        }),
        [ appModel ],
    );

    return (
        <AppContext.Provider value={appModel}>
            <header className="markov-chains-app__header">
                <h1 className="markov-chains-app__heading">Цепи Маркова</h1>
            </header>

            <main className="markov-chains-app__main-content">
                <div className="markov-chains-app__generated-text-block">{appModel.generatedText}</div>
                <div className="markov-chains-app__generate-text-block">
                    <button
                        className="markov-chains-app__generate-text-button"
                        onClick={onGenerateButtonClick}
                    >
                        Сгенерировать текст
                    </button>
                </div>
                <GenerationSettings />
                <TextSourcesList model={appModel.sourcesListModel} />
            </main>

            <footer className="markov-chains-app__footer">
                <div className="markov-chains-app__help-block">
                    Какая-то информация в футере, не знаю.
                </div>
            </footer>
        </AppContext.Provider>
    );
});

export default MarkovChainsApp;

import * as express from 'express';
import * as bodyParser from 'body-parser';
import { PunGenerator } from 'pungent';

import * as byline from 'byline';

export function bootstrapApi(): any {
    const app = express();
    app.use(bodyParser.json({limit: '100mb'}));

    const router = express.Router();
    
    router.post('/pun', (req, res) => {
        const punWord: string = req.body.punWord;
        const phrase: string = req.body.phrase;

        req.body.options = req.body.options || {};

        const generator = new PunGenerator({
            punFrequency: req.body.options.punFrequency || 1,
            punScoreTolerance: req.body.options.punScoreTolerance || .5,
            replacementTolerance: req.body.options.replacementTolerance || .5
        });

        let resultLines: string[] = 
            phrase.split('\n')
                .map(line => generator.generatePuns(line, punWord)
                    .map(p => p.word)
                    .join(' ')
                );

        res.json({ resultLines });
    });

    app.use('/api', router);

    return app;
}
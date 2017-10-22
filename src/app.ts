import * as express from 'express';
import { PunGenerator } from 'pungent';

export function bootstrapApi(): any {
    const app = express();
    const router = express.Router();
    
    router.get('/pun', (req, res) => {
        const punWord = req.query.punWord;
        const phrase = req.query.phrase;

        const generator = new PunGenerator();
        
        var puns = generator.generatePuns(phrase, punWord);

        res.json({
            result: puns.map(p => p.syllables.map(s => s.text).join('')).join(' ')
        });
    });

    app.use('/api', router);

    return app;
}
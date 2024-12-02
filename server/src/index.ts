import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
var cors = require('cors')
import expressLayouts from 'express-ejs-layouts';

dotenv.config();

const base_url = '/dhss101-control';
const app: Express = express();
const port = process.env.PORT || 3000;
const MAX_SLIDE = 100;

var SLIDE = 0;

app.use(express.raw({ type: '*/*', limit: '10mb' }));
app.use(expressLayouts);
app.use(cors())
app.set('layout', 'layouts/layout');
app.set('view engine', 'ejs');

app.post('/forward', (req: Request, res: Response) => {
    if(SLIDE < MAX_SLIDE) {
        SLIDE++;
        console.log('Now on slide:', SLIDE);
    }
    res.redirect(base_url + '/control');
});

app.get('/set/:slide', (req: Request, res: Response) => {
    let s = Number.parseInt(req.params.slide);
    if(s >= 0 && s <= MAX_SLIDE) {
        SLIDE = s;
        console.log('Now on slide:', SLIDE);
    }
    res.redirect(base_url + '/control');
});

app.post('/backward', (req: Request, res: Response) => {
    if(SLIDE > 0) {
        SLIDE--;
        console.log('Now on slide:', SLIDE);
    }
    res.redirect(base_url + '/control');
});

app.get('/', (req: Request, res: Response) => {
    res.json({
        'slide': SLIDE,
        'max_slide': MAX_SLIDE
    });
});

app.get('/control', (req: Request, res: Response) => {
    res.render('index', {
        base_url: base_url,
        slide: SLIDE,
        max_slide: MAX_SLIDE
    });
});

app.listen(port, () => {
  console.log(`[Server]: Server is running on port ${port}`);
});
import express from 'express'
const app = express();
const router = express.Router();
router.get('/', (req, res)=>{
    const obj = {
        title : 'my note',
        job : 'Web Developer'
    }
    res.json(obj);
})
export default router;
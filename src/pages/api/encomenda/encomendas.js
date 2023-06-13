import { encomendas} from "../../../services/encomenda.js"

export  default async function handler(req, res) {
    try {
        const encs = await encomendas()
        res.status(200).json(encs)
    } catch (err) {
        res.status(400).json("Retornou um erro! => " + err.message)
    }
}
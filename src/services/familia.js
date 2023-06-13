import {query} from "/db.js"

async function podeExcluir(codigo){
    let retorno = false;
    try {
        const familia = await query({
            query:  "SELECT * FROM tb_estcontrole WHERE idFamilia = ?",
            values: [   
                        codigo,
                    ]
        });
        if(familia.affectedRows > 0){
            retorno = false;
        }else{
            retorno = true;
        }
    } catch (error) {
        throw new Error("Erro inesperado! " + error.description);
    }
    return retorno;
}

export async function listaFamilias(body) {
    let fams = [];
    try {    
        fams = await query({

            query:  "  SELECT "
                    + "     A.id, "
                    + "     A.idEncomenda, "
                    + "     B.codEncomenda, "
                    + "     A.familia, "
                    + "     A.espcificacao As especificacao , "
                    + "     A.cod_erp As cod_Erp "
                    + "FROM "
                    + " scmd3.tb_familias A Left Join scmd3.tb_encomenda B "
                    + " ON A.idEncomenda = B.id"
                    + " WHERE idEncomenda = ?"
                    + " ORDER BY Familia",
            values: [body.idEncomenda]
        });
  
        if (!fams){
            throw new Error('Não tem familias cadastradas!')
        }  
    } catch (error) {
        
        throw new Error("Não foi possivel pesquisar as familias!");
    }
    return fams
}

export async function retFamilias(body){
    let fams = [];
    console.log(body)
    try { 
        fams = await query({
            query:  " SELECT "
                    +"  id as idFamilia, "
                    +"  Familia "
                    +" FROM scmd3.tb_familias"
                    +" WHERE idEncomenda = ?"
                    +" ORDER BY Familia",
            values: [body.idEncomenda],
        });
        if (!fams){
            throw new Error('Não tem familias cadastradas!')
        } 

    } catch (error) {
        // "Não foi possivel pesquisar as familias!"
        throw new Error(error);
    }
    return fams
}

export async function cadastro(body){
    let retorno = 0;
    try {
        const familia = await query({
            query:  "CALL insert_Familia(?,?,?,?,?)",
            values: [   
                        body.idEncomenda, 
                        body.familia,
                        body.especificacao,
                        body.cod_Erp,
                        body.enc
                    ]
        });

        if (!familia) throw new Error('Familia não cadastrada')
        else{ 
            if (familia === 0)
            {
                throw new Error('Erro, a familia já está cadatrada!')
            }else{
                retorno = familia;
            }
        }   
    } catch (error) {
        throw new Error("Erro inesperado! " + error.description);
    }
    return retorno;
}

export async function edicao(body){
    let retorno = 0;
    try {
        const familia = await query({
            query:  "UPDATE tb_familias SET "
                    + "espcificacao = ?, "
                    + "cod_erp = ? "
                    + "WHERE id = ?",     
            values: [   
                        body.especificacao,
                        body.cod_Erp, 
                        body.id,
                    ]
        });

        if(familia.affectedRows > 0){
            retorno = familia.affectedRows;
        }
        else{
            throw new Error('Não foi possivel alterar a familia')
        } 
    } catch (error) {
        
        throw new Error("Erro inesperado! " + error.description);
    }
    return retorno;
}

export async function exclusao(codigo){
    let retorno = 0;
    try {
        if(podeExcluir(codigo)){

            const familia = await query({
                query:  "DELETE FROM tb_Familias WHERE id = ?",
                values: [   
                            codigo
                        ]
            });
            if(familia.affectedRows > 0){
                retorno = familia.affectedRows;
            }
            else{
                throw new Error('Não foi possivel excluir a familia')
            }
        }
        else {
            throw new Error('Essa familia não pode ser excluida!')
        }
    } catch (error) {
        throw new Error("Erro inesperado! " + error.description);
    }
    return retorno;
}
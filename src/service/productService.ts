import { writeFile, readFile } from 'fs/promises'

class ProductService {
    public async writeProduct(product: any) {
        try {
            await writeFile('products.json', JSON.stringify(product, null, 2))
        }
        catch(err) {
            console.error('erro na escrita', err)
        }
    }

    public async readProduct(): Promise<any> {
        try {
            const file = await readFile('products.json', { encoding: 'utf-8' })
            return JSON.parse(file)
        }
        catch(err) {
            console.error('erro na leitura', err)
        }
    }

    public async readProductStock(): Promise<any> {
        try {
            const products = await this.readProduct()
            return products.map(product => { return {
                nome: product.nome,
                qtde: product.qtde,
                preco: product.preco,
                valor_estoque: product.qtde * product.preco
            }})
        }
        catch(err) {
            console.error('erro na leitura do estoque', err)
        }
    }
}

export default new ProductService()

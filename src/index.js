import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class EncomendaList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return this.loadItems();
    }

    loadItems(){
        const encomendas = JSON.parse(localStorage.getItem("encomendas") || "[]"); //Pega o valor da variável encomendas do LocalStorage
        let listEncomendas = [];
        
        if(encomendas.length > 0){
            listEncomendas = encomendas.map((encomenda, index) => 
                <tr key={index}>
                    <td>
                        {encomenda.produto}
                    </td>
                    <td>
                        {encomenda.valor}
                    </td>
                    <td>
                        {encomenda.entrega ? "Sim" : "Não"}
                    </td>
                </tr>
            );
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>
                            Produto
                        </th>
                        <th>
                            Valor
                        </th>
                        <th>
                            Entrega
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listEncomendas.length > 0 ? listEncomendas : <tr><td colSpan={3}>Não existem encomendas</td></tr>}
                </tbody>
            </table>
        )
    }
}

class EncomendaForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            produto: 'Batata-frita',
            valor: 0,
            entrega: true
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.name === 'entrega' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        const encomendas = JSON.parse(localStorage.getItem("encomendas") || "[]"); //Pega o valor da variável encomendas do LocalStorage

        console.log(this.state.entrega);

        encomendas.push(this.state); //Adiciona um novo item dentro das encomendas
        localStorage.setItem("encomendas", JSON.stringify(encomendas));

        document.getElementById('alertEncomenda').classList.remove("hide");

        setTimeout(function(){
            document.getElementById('alertEncomenda').classList.add("hide");
        }, 5000);

        event.preventDefault();
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="group-form">
                    <label>
                        Produto
                    </label>
                    <select name="produto" value={this.state.produto} onChange={this.handleInputChange}>
                        <option value="Batata-frita">Batata-frita</option>
                        <option value="Hamburguer">Hamburguer</option>
                        <option value="Pizza">Pizza</option>
                    </select>
                </div>
                <div className="group-form">
                    <label>
                        Valor
                    </label>
                    <input name="valor" type="number" value={this.state.valor} onChange={this.handleInputChange}/>
                </div>
                <div className="group-form">
                    <label>
                        Entrega
                    </label>
                    <input name="entrega" type="checkbox" checked={this.state.entrega} onChange={this.handleInputChange}/>
                </div>
                <input type="submit" value="Encomendar" className="button-success"/>
            </form>
        )
    }
}

class EncomendaIndex extends React.Component{
    showForm(){
        console.log("Achou");
        document.getElementById('formEncomenda').classList.remove("hide");
    }

    render(){
        return (
            <div className="index">
                <div className="lista-encomenda">
                    <EncomendaList/>
                    <input id="btnNovaEncomenda" onClick={this.showForm} type="button" value="Nova Encomenda" className="button-success"/>
                </div>
                <div id="formEncomenda" className="form-encomenda hide">
                    <div id="alertEncomenda" className="hide alert-success">Encomenda adicionada.</div>
                    <EncomendaForm/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <EncomendaIndex/>,
    document.getElementById('root')
)
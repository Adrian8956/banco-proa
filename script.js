// parte de cadastro
function Cadastro() {
    const nome = document.getElementById("nome").value;
    const sobreNome = document.getElementById("sobrenome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value; 
    const senha = document.getElementById("senha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value; 

    if (senha != confirmarSenha) {
        alert("Senhas incorretas!");
        return
    } 
    else if(senha.length < 4 && confirmarSenha.length < 4){
        alert("Senha muito curta!")
        return
    }
    else {
        const usuario = {
            nome: nome,
            sobrenome: sobreNome,
            cpf: cpf, 
            email: email, 
            senha: senha
        };



        // Verifica se já existem dados no Local Storage
        let usuariosSalvos = localStorage.getItem("usuarios");
        let db = [];

        if (usuariosSalvos) {
            db = JSON.parse(usuariosSalvos);
        }

        db.push(usuario);

        // Salva os dados atualizados no Local Storage
        localStorage.setItem("usuarios", JSON.stringify(db));
        console.log(usuario);
        alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
        return
    }  
}

// parte de login

function login() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
  
    let loginSucesso = false;
    const usuariosSalvos = localStorage.getItem("usuarios");
    const db = JSON.parse(usuariosSalvos) || [];
    let user = ""; // Variável para armazenar o nome do usuário logado
    
    for (let i = 0; i < db.length; i++) {
        if (email === db[i].email && senha === db[i].senha) {
            loginSucesso = true;
            user = db[i].nome; // Armazena o nome do usuário logado na variável 'user'
            break;
        }  
    }

    if (loginSucesso) {
        alert(`Login realizado com sucesso! ${user}`);
        localStorage.setItem('userName', user); // Armazena o nome do usuário logado no localStorage
        window.location.href = "banco.html";
        return;
    } else {
        alert("Usuário ou senha incorretos!");
        return;
    }
}

// funcao que captura o valor do input
window.onload = function() {
    const userName = localStorage.getItem('userName');
    if (userName) {
        console.log("Nome do usuário logado: " + userName); // Exibe o nome do usuário logado no console

        // Atualiza o texto do elemento com o nome do usuário
        const bemVindoElement = document.getElementById('bemVindo');
        bemVindoElement.textContent = "Bem vindo, " + userName;
    } else {
        console.log("Usuário não está logado.");
    }
}

// parte de operações bancárias
function capturarValor() {
    let valor = document.getElementById("valor").value;
    // Converte o valor para um número
    valor = Number(valor);
    // Retorna o valor
    return valor;
}

let conta = capturarValor();


function atualizarSaldo(){
    let saldo = document.getElementById("saldo");
    if(conta < 0){
        saldo.style.color = "red";
    }
    saldo.innerHTML = conta;
}




function depositar(){
    let depositar = capturarValor();
    if(depositar > 0){
        let senha = prompt("Digite sua senha")
        senha = parseInt(senha)
        if(senha == 3589){
            conta += depositar;
            alert(`Deposito de ${depositar} realizado com sucesso!`)
            atualizarSaldo();
            limpar();
        }
        else{
            alert("Senha incorreta")
        }
    }else{
        alert("Valor inválido")
    }
}

function transferir(){
    let transferir = capturarValor();
    if(transferir < conta){
        let contaDestino = prompt("Digite a conta destino")
        contaDestino = parseInt(contaDestino)
        let senha = prompt("Digite sua senha")
        if(contaDestino == contaDestino && senha == 3589){
            conta -= transferir;
            alert(`Transferência de ${transferir} realizada com sucesso! para a conta ${contaDestino}`)
            atualizarSaldo();
            limpar();
        }
        else{
            alert("Conta inválida")
        }
    }else{
      alert("Saldo insuficiente")
    }
}

function sacar(){
    let sacar = capturarValor();
    if(sacar < conta){
        let senha = prompt("Digite sua senha")
        if(senha == 3589){
            contaArmazenada -= sacar;
            alert(`Saque de ${sacar} realizado com sucesso!`)
            atualizarSaldo();
            limpar();
        }
    }else{
        alert("Saldo insuficiente")
    }
}

function extrato(){
    let senha = prompt("Digite sua senha")
    if(senha == 3589){
    alert(`Amazon: -100R$ \nSalário: +1000R$ \nMercado: -200R$ \nshoppe: -100R$ \nNetflix: -50R$`)
    }
    else{
        alert("Senha incorreta")
    }
}

function sair(){
    let sair = confirm("Deseja realmente sair?")
    if(sair == true){
        alert("Foi um prazer ter você aqui!")
        setTimeout(window.location.href = "index.html", 3000)
    }
}

function limpar(){
    document.getElementById("valor").value = ""
}
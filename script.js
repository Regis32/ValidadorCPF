$(document).ready(function () {
    $('#cpf').inputmask('999.999.999-99');
});

//Func_Validador de Cpf 
function validaCPF() {
    const cpfFormatado = document.getElementById('cpf').value;
    const cpf = limpaFormatacao(cpfFormatado);

    if (cpf.length != 11)
        
        mostraResultado('CPF deve conter 11 dígitos.', 'black');

    else if (verificarDigitosRepetidos(cpf))

        mostraResultado('CPF não pode conter repetição do mesmo digito', 'balck');

    else {
        const digito1 = calcularDigitoVerificador(cpf, 1);
        const digito2 = calcularDigitoVerificador(cpf, 2);
        if (!digito1)

            mostraResultado(`CPF Inválido - ${cpfFormatado}`, `red`);

        else if (!digito2)

            mostraResultado(`CPF Inválido - ${cpfFormatado}`, `red`);

        else

            mostraResultado(`CPF Válido - ${cpfFormatado}`, `green`);
    }
    return;
}
//Func_Digito Verificador
function calcularDigitoVerificador(cpf, posicao) {
    const sequencia = cpf.slice(0, 8 + posicao).split('');

    let soma = 0;
    let multiplicador = 9 + posicao;

    for (const numero of sequencia) {
        soma += multiplicador * Number(numero);
        multiplicador--;
    }

    const restoDivisao = (soma * 10) % 11;
    const digito = cpf.slice(8 + posicao, 9 + posicao);

    return restoDivisao == digito;
}

//Remove Tudo que não é digito
//Param: CPF - Valor do CPF informado
//Retorno CPF somente digitos
function limpaFormatacao(cpf) {
    cpf = cpf.replace(/\D/g, '');

    return cpf;
}

//Mostrar Resultado
function mostraResultado(texto, cor) {
    const span = document.getElementById('resultado');

    span.innerHTML = texto;
    span.style.color = cor
}

//Verificador de Num_Repetidos
function verificarDigitosRepetidos(cpf) {
    return cpf.split('').every((d) => d === cpf[0]);
}

import React, { useState } from 'react';
import{ View, Text, Button, TextInput, StyleSheet } from 'react-native';

// Superclasse Funcionário
class Funcionario {
  constructor(nome, cargo, salarioBase, anosDeExperiencia, desempenho){
    this.nome = nome;
    this.cargo = cargo; 
    this.salarioBase = salarioBase;
    this.anosDeExperiencia = anosDeExperiencia;
    this.desempenho = desempenho;
  }

  calcularSalario() {
    //Método abstrato, será sobrescrito pelas subclasses
    throw new Error('O métood calcularSalario() precisa ser implementado!');
   }

   exibirInformacoes() {
     return `Nome: ${this.nome}\nCargo: ${this.cargo}\nSalário Base: R$ ${this.salarioBase}\nAnos de Experiência: ${this.anosDeExperiencia}\nDesempenho: ${this.desempenho}\nSalário Final: R$ ${this.calcularSalario()}`;
   }
}

// Subclasse Assistente
class Assistente extends Funcionario {
  constructor(nome,salarioBase, anosDeExperiencia, desempenho){
    super(nome, 'Assistente', salarioBase, anosDeExperiencia, desempenho);
  }


  calcularSalario(){
    let salario = this.salarioBase;
    salario += this.anosDeExperiencia * 50; // Aumento de R$50 por ano de experiência
    salario += this.desempenho * 200; // Bônus de desempenho
    return salario;
  }
}

// Subclasse Gerente
class Gerente extends Funcionario {
  constructor(nome, salarioBase, anosDeExperiencia, desempenho) {
    super(nome, 'Gerente', salarioBase, anosDeExperiencia, desempenho);
  }
  calcularSalario(){
    let salario = this.salarioBase;
    salario += this.anosDeExperiencia * 100; // Aumento de R$100 por ano de experiência
    salario += this.desempenho * 500; // Bônus de desempenho
    return salario;
  }
}

export default function App() {
  const[nome, setNome]= useState('');
  const [salarioBase, setSalarioBase] = useState('');
  const [anosDeExperiencia, setAnosDeExperiencia] = useState('');
  const [desempenho, setDesempenho] = useState('');
  const [resultado, setResultado] = useState('');

  const handleCadastrar = () => {
    if (!nome || !salarioBase || !anosDeExperiencia || !desempenho){
      setResultado('Por favor, preencha todos os campos!');
      return;
    }

    // Convertendo os valores de entrada
    const salarioBaseNum = parseFloat(salarioBase);
    const anosDeExperienciaNum = parseInt(anosDeExperiencia, 10);
    const desempenhoNum = parseFloat(desempenho);

    if (isNaN(salarioBaseNum) || isNaN(anosDeExperienciaNum) || isNaN(desempenhoNum)){
      setResultado('Valores inválidos. Por favor, insira números válidos.');
      return;
    }

    // Escolher o tipo de funcionário
    const assistente = new Assistente(nome, salarioBaseNum, anosDeExperienciaNum, desempenhoNum );
    const gerente = new Gerente(nome, salarioBaseNum, anosDeExperienciaNum, desempenhoNum);

    // Exibindo informações dos dois funcionários
    setResultado(`Informações do Assistente: \n${assistente.exibirInformacoes()}\n\nInformações do Gerente:\n${gerente.exibirInformacoes()}`);
  };


  return (

    <View style={styles.container}>
      <Text style={styles.header}>Cadastro de Funcionários</Text>

      <TextInput
       style={styles.input}
       placeholder="Nome"
       value={nome}
       onChangeText={setNome}
      />
      <TextInput
       style={styles.input}
       placeholder="Salário Base"
       value={salarioBase}
       keyboardType="numeric"
       onChangeText={setSalarioBase}
      />
      <TextInput
       style={styles.input}
       placeholder="Anos de Experiência"
       value={anosDeExperiencia}
       keyboardType="numeric"
       onChangeText={setAnosDeExperiencia}  
      />
      <TextInput
       style={styles.input}
       placeholder="Desempenho (0 a 1)"
       value={desempenho}
       keyboardType="numeric"
       onChangeText={setDesempenho}
      />

      <Button title="Cadastrar" onPress={handleCadastrar}/>

      <Text style={styles.result}>{resultado}</Text>
     </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    padding: 20,
    },
    header: { 
       fontSize: 24,
       fontWeight: 'bold',
       marginBottom: 20, 
    },
    input: {
      heigth: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 8,
      width: '100',
    },
    result: {
      marginTop: 20,
      fontSize:16,
      textAlign: 'center',
    },
});
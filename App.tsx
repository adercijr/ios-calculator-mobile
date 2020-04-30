import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component {

  state = {
    display: '0',
    result: ''
  }

  handleOp = (op) => {
    if(op === 'C'){
      this.setState({
        display: '0',
        result: ''
      })
    } else if(op === '√' && this.state.result) {
      const result = this.state.result
      const resulFinal = Math.sqrt(result)
      this.setState({
        display: resulFinal,
        result: ''
      })
    } else if(op === '√' && !this.state.result) {
      const display = this.state.display
      const resulFinal = Math.sqrt(display)
      this.setState({
        display: resulFinal,
        result: ''
      })

    } else if(op === '='){
      this.setState({
        display: this.state.result,
        result: '' 
      })  

    } else if(op === '+/-'){
      if(!this.state.result){
        const display = this.state.display
        this.setState({
          display: display * -1
        }) 
      } else {
        const result = this.state.result
        this.setState({          
          display: result * -1,
          result: ''
        }) 
      }
           
                  
    } else if(this.state.display === '0'){
      this.setState({
        display: op      
      })
      
    }    
    else {      
      const display = this.state.display + op
      let result = this.state.result
      try{
        let fixedOperation = display.split('x').join('*')
        fixedOperation = fixedOperation.split('÷').join('/')
        result = new String(eval(fixedOperation)).toString()
      } catch(e){}
      this.setState({
        display,
        result
      })
    }    
  }

  render(){

    const colExp = [['C','+/-', '√']]
    

    const col1Buttons = [
      
      ['7', '8', '9'],
      ['4', '5', '6'],
      ['1', '2', '3'],
      
    ]

    const col1R = [
      ['0', '.']
    ]
  
    const col2Buttons = ['÷', 'x', '-', '+', '=']

    return (
      <View style={styles.container}>
        <Text style={styles.display}>{this.state.display}</Text>
        <Text style={styles.result}>{this.state.result}</Text>
        <View style={styles.buttons}>

          <View style={styles.col1}>

          {colExp.map( (line, ind) => <View key={ind} style={styles.line}>   
              {line.map( op => <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}> 
                  <Text style={styles.btnTxt3}>{op}</Text> 
                </TouchableOpacity>)} 
            </View>)}

            {col1Buttons.map( (line, ind) => <View key={ind} style={styles.line}>   
              {line.map( op => <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}> 
                  <Text style={styles.btnTxt}>{op}</Text> 
                </TouchableOpacity>)} 
            </View>)}

            {/* Numero 0 e . */}
            {col1R.map( (line, ind) => <View key={ind} style={styles.line}>   
              {line.map( op => <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}> 
                  <Text style={styles.btnTxt}>{op}</Text> 
                </TouchableOpacity>)} 
            </View>)}

          </View>
                   

          <View style={styles.col2}>
              {col2Buttons.map( op => <TouchableOpacity key={op} style={styles.btn} onPress={() => this.handleOp(op)}> 
                  <Text style={styles.btnTxt2}>{op}</Text> 
                </TouchableOpacity>)} 
            
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',    
  },
  buttons: {
    flex: 2.7,
    flexDirection: 'row',
    backgroundColor: '#000'
  },
  display: {
    flex: 1,
    backgroundColor: '#000',
    fontSize: 70,
    textAlign: 'right',
    paddingRight: 20,
    paddingLeft: 20,
    textAlignVertical: 'center',  
    color: '#fff' ,
    paddingTop: 20 
  },
  result: {
    flex: 0.6,
    backgroundColor: '#000',
    fontSize: 30,
    textAlign: 'right',
    paddingRight: 10,
    paddingBottom: 10,
    color: '#fff' 
  },
  col1: {
    flex: 3
  },
  col2: {
    flex: 1
  },
  line: {
    flexDirection: 'row',
    flex: 1
  },  
  btn: {
    flex: 1,
    justifyContent: 'center'
  },
  btnTxt: {
    fontSize: 30,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#333",
    flex: 0.9,
    textAlignVertical: 'center',
    borderRadius: 50,
    margin: 4,
    backgroundColor: '#333',
    color: "#fff"
  },
  btnTxt2: {
    fontSize: 30,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#333",
    flex: 0.9,
    textAlignVertical: 'center',
    borderRadius: 60,
    backgroundColor: '#FE9505',
    margin: 4,
    color: '#fff'
  },
  btnTxt3: {
    fontSize: 30,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#333",
    flex: 1,
    textAlignVertical: 'center',
    borderRadius: 60,
    backgroundColor: '#A5A5A5',
    margin: 4
  },
});

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { HexColorInput } from '../../components/HexColorInput';
import { UIButton } from '../../components/UIButton';

export function Home() {
  const [red, setRed] = useState('')
  const [green, setGreen] = useState('')
  const [blue, setBlue] = useState('')
  const [start, setStart] = useState<'break' | 'stop' | 'init'>('break')

  const [redAdded, setRedAdded] = useState('')
  const [greenAdded, setGreenAdded] = useState('')
  const [blueAdded, setBlueAdded] = useState('')

  const transformColorStateInHex = () => {
    const padStart = (color: string) => color.padEnd(2, color ? color : '0')

    return `#${padStart(red)}${padStart(green)}${padStart(blue)}`
  }

  const [backgroundColor, setBackgroundColor] = useState(transformColorStateInHex())

  function handleCopy() {
    Clipboard.setString(backgroundColor.toUpperCase())
  }

  function handleStartButton() {
    const updateStart = start === 'init' ? 'stop' : 'init'
    setStart(updateStart)
  }

  useEffect(() => {
    let interval: NodeJS.Timer;

    
    if (start === 'init') {
      let backgroundColorFormatted = backgroundColor.slice(1, 7).toLowerCase()
      
      let red = backgroundColorFormatted.slice(0, 2)
      let green = backgroundColorFormatted.slice(2, 4)
      let blue = backgroundColorFormatted.slice(4, 6)

      const convertAddValue = (value: string) => value === '' ? 1 : Number(value)

      let changeRedAdded = convertAddValue(redAdded)
      let changeGreenAdded = convertAddValue(greenAdded)
      let changeBlueAdded = convertAddValue(blueAdded)

      interval = setInterval(() => {
        function reverseAdds(color: string, added: number) {
          switch (color) {
            case 'ff': return -Math.abs(added)
            case '00': return Math.abs(added)
            default: return added
          }
        }

        changeRedAdded = reverseAdds(red, changeRedAdded)
        changeGreenAdded = reverseAdds(green, changeGreenAdded)
        changeBlueAdded = reverseAdds(blue, changeBlueAdded)

        function added(color: string, add: number) {
          const convertColor = parseInt(color, 16)

          const updatedColor = () => {
            if (convertColor > 255 || convertColor + add > 255) return 255
            else if (convertColor < 0 || convertColor + add < 0) return 0
            else return convertColor + add
          }

          return updatedColor().toString(16).padStart(2, '0')
        }
        red = added(red, changeRedAdded)
        green = added(green, changeGreenAdded)
        blue = added(blue, changeBlueAdded)

        const newHex = `#${red}${green}${blue}`

        setBackgroundColor(newHex)
      }, 25)
    } 

    return () => clearInterval(interval)
  }, [start])

  useEffect(() => {
    setStart('break')
    setBackgroundColor(transformColorStateInHex())
  }, [red, green, blue, redAdded, greenAdded, blueAdded])

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{backgroundColor.toUpperCase()}</Text>
        <UIButton
          title='COPIAR'
          backgroundColor='#ff9741'
          onPress={handleCopy}
          type="header"
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.colorInputs}>
          <View style={styles.description}>
            <Text style={{width: 90}}></Text>
            <Text style={styles.descriptionText} adjustsFontSizeToFit>Cor</Text>
            <Text style={styles.descriptionText} adjustsFontSizeToFit>Velocidade</Text>
          </View>

          <View style={styles.inputs}>
            <HexColorInput
              title="Vermelho"
              value={red}
              setValue={setRed}
              addValue={redAdded}
              setAddValue={setRedAdded}
            />
            <HexColorInput
              title="Verde"
              value={green}
              setValue={setGreen}
              addValue={greenAdded}
              setAddValue={setGreenAdded}
            />
            <HexColorInput
              title="Azul"
              value={blue}
              setValue={setBlue}
              addValue={blueAdded}
              setAddValue={setBlueAdded}
            />

          </View>
        </View>
        <UIButton
          title={start === 'init' ? 'Parar' : 'Iniciar'}
          backgroundColor={start === 'init' ? '#ec6161' : '#6cec61'}
          onPress={handleStartButton}
          type="start"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    margin: 20,
    borderRadius: 10,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  footer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 20
  },
  colorInputs: {
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 5
  },
  inputs: {

  },
  description: {
    flexDirection: 'row'
  },
  descriptionText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
const colors = [
  {color: '#000000'},
  {color: '#303030'},
  {color: '#505050'},
  {color: '#A0A0A0'},
  {color: '#1B2C40'},
  {color: '#5B4CFF'},
  {color: '#8080FF'},
  {color: '#3182DE'},
  {color: '#14D3F5'},
  {color: '#3BF7DE'},
  {color: '#7090B5'},
  {color: '#134022'},
  {color: '#394003'},
  {color: '#00A629'},
  {color: '#5BE37D'},
  {color: '#B8FC68'},
  {color: '#E4FA3C'},
  {color: '#FFCC33'},
  {color: '#FC6B3A'},
  {color: '#F83C40'},
  {color: '#F83478'},
  {color: '#F80070'},
  {color: '#D828B8'},
  {color: '#A51E7C'},
  {color: '#BD4EFC'},
  {color: '#FFFFFF'},
];

const settings = (props) => {
  return (
    <Page>
      <Section title={<Text bold align="center">Sliding Text Improved</Text>}>
        <Toggle label="Show Battery Bar" settingsKey="showBattery" />
        <Toggle label="Dim Battery Bar" settingsKey="dimBattery" />
        <Toggle label="Short Oh" settingsKey="shortOh" />
      </Section>
      <Section title={<Text bold align="center">Colors</Text>}>
        <Text>Background Color</Text>
        <ColorSelect settingsKey="bgColor" colors={colors} />
        
        <Text>Foreground Color</Text>
        <ColorSelect settingsKey="fgColor" colors={colors} />
      </Section>
    </Page>
  )
}

registerSettingsPage(settings);
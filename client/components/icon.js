import React from 'react'
import ClearDay from './icons/clear-day'
import ClearNight from './icons/clear-night'
import Cloudy from './icons/cloudy'
import Fog from './icons/fog'
import PartlyCloudyDay from './icons/partly-cloudy-day'
import PartlyCloudyNight from './icons/partly-cloudy-night'
import Rain from './icons/rain'
import Sleet from './icons/sleet'
import SmokeCo from './icons/smoke-co'
import Snow from './icons/snow'
import Thermometer from './icons/thermometer'
import Train from './icons/train'
import Umbrella from './icons/umbrella'
import Wifi from './icons/wifi'
import Wind from './icons/wind'

import 'styles/components/icon'

const ICON_MAP = {
    'clear-day': <ClearDay />,
    'clear-night': <ClearNight />,
    'cloudy': <Cloudy />,
    'fog': <Fog />,
    'partly-cloudy-day': <PartlyCloudyDay />,
    'partly-cloudy-night': <PartlyCloudyNight />,
    'rain': <Rain />,
    'sleet': <Sleet />,
    'smoke-co': <SmokeCo />,
    'snow': <Snow />,
    'thermometer': <Thermometer />,
    'train': <Train />,
    'umbrella': <Umbrella />,
    'wifi': <Wifi />,
    'wind': <Wind />
}

const Icon = (props) =>
    <span className="icon">{ICON_MAP[props.image]}</span>

Icon.propTypes = {
    image: React.PropTypes.string.isRequired
}

export default Icon

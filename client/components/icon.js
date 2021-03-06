import React, { PropTypes } from 'react'
import Back from 'svg/back'
import ClearDay from 'svg/clear-day'
import ClearNight from 'svg/clear-night'
import Cloudy from 'svg/cloudy'
import Cog from 'svg/cog'
import Fog from 'svg/fog'
import PartlyCloudyDay from 'svg/partly-cloudy-day'
import PartlyCloudyNight from 'svg/partly-cloudy-night'
import Rain from 'svg/rain'
import Sleet from 'svg/sleet'
import SmokeCo from 'svg/smoke-co'
import Snow from 'svg/snow'
import Thermometer from 'svg/thermometer'
import Train from 'svg/train'
import Umbrella from 'svg/umbrella'
import Wifi from 'svg/wifi'
import Wind from 'svg/wind'

import 'styles/components/icon'

const ICON_MAP = {
    'back': <Back />,
    'clear-day': <ClearDay />,
    'clear-night': <ClearNight />,
    'cog': <Cog />,
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

const Icon = ({ image }) =>
    <span className="icon">{ICON_MAP[image]}</span>

Icon.propTypes = {
    image: PropTypes.string.isRequired
}

export default Icon

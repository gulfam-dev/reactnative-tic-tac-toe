import React from 'react'
import type { PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

type IconsProps = PropsWithChildren<{
    name: string;
}>

const Icons = ({ name }: IconsProps) => {
    switch (name) {
        case 'circle':
            return < Icon name='circle-thin' size={38} color="#E44236" />
            break;
        case 'cross':
            return < Icon name='times' size={38} color="#45CE30" />
            break;

        default:
            return < Icon name='question' size={39} color="#fff" />

    }
}

export default Icons
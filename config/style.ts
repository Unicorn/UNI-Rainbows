/** @format */

import { Platform, StyleSheet } from 'react-native'
import { THEME } from './theme'
import { isMobile } from '../helpers/screen'

export const STYLE = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: THEME.size[3],
    marginBottom: THEME.space[3],
    padding: THEME.space[3],
    shadowColor: THEME.colors.purple[200],
    shadowRadius: 0,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    width: '100%',
  },
  button: {
    backgroundColor: '#FFD465',
    borderRadius: 10,
    color: '#423616',
    fontFamily: THEME.font.display,
    paddingHorizontal: THEME.space[4],
    paddingBottom: isMobile() ? THEME.space[2] : THEME.space[3],
    paddingTop: isMobile() ? THEME.space[2] : THEME.space[3],
    fontSize: THEME.size[6],
    lineHeight: THEME.size[6],
    shadowColor: '#B9A062',
    shadowRadius: 0,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    textAlign: 'center',
    textTransform: 'uppercase',
  },
})

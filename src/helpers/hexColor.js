import {switchy} from '.'


export function hexColor(color) {
  return switchy(color)({
    RED:'#ee4646',
    ORANGE:'#ed9a47',
    YELLOW:'#d5cb49',
    GREEN:'#60c175',
    BLUE:'#4975d5',
    PURPLE:'#9669d7',
    SILVER:'#c8c8c8',
    NIGHT:'#333333',
    WEEKEND:'#85d6d9',
    HEALTH:'#f28db7',
    CHARTER:'#ac7d51',
    DEFAULT:'#5d0000',
  })
}

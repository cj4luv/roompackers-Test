import { SAMPLE, CHANGE_TITLE, CHANGE_INT_TITLE, MODAL_VISIBLE } from './constants'

export const sampleCode = (code) => {
  return {
    type: SAMPLE,
    payload: {
      code
    }
  }
}

export const changePortfolioTitle = (str) => {
	console.log('actions called');
  return {
    type: CHANGE_TITLE,
    pfTitle: str,
  }
}

export const changeInterioristTitle = (str) => {
	console.log('actions called');
  return {
    type: CHANGE_INT_TITLE,
    intTitle: str,
  }
}

export const changeModalSwich = (visible) => {
  console.log('action modal action called');
  console.log("action: " + visible);
  return {
    type:MODAL_VISIBLE,
    modalVisible: visible,
  }
}

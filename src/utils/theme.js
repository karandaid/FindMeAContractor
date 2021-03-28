import {theme} from './evaTheme';

var deepSquidInk = '#152939';
exports.deepSquidInk = deepSquidInk;
var linkUnderlayColor = '#FFF';
exports.linkUnderlayColor = linkUnderlayColor;
var textInputColor = '#000000';
exports.textInputColor = textInputColor;
var textInputBorderColor = 'transparent';
exports.textInputBorderColor = textInputBorderColor;
var placeholderColor = '#C7C7CD';
exports.placeholderColor = placeholderColor;
var buttonColor = 'white';
exports.buttonColor = buttonColor;
var disabledButtonColor = '#EFEFEF'; // Theme

const AmplifyTheme = {
  container: {
    flex: 1,

    backgroundColor: '#F6F6F8',
  },

  sectionFooterLink: {
    color: 'black',
    textAlign: 'center',
  },

  button: {
    backgroundColor: theme['color-primary-500'],
    alignItems: 'center',
    padding: 16,
  },
  buttonDisabled: {
    backgroundColor: disabledButtonColor,
    alignItems: 'center',
    padding: 16,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
};

export default AmplifyTheme;

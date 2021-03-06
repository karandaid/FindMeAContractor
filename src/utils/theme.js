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
    fontFamily: 'Andale Mono',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
    width: '100%',
    backgroundColor: '#F6F6F8',
  },
  section: {
    fontFamily: 'Andale Mono',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sectionScroll: {
    fontFamily: 'Andale Mono',
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontFamily: 'Andale Mono',
    width: '100%',
    marginBottom: 32,
    paddingTop: 20,
  },
  sectionHeaderText: {
    fontFamily: 'Andale Mono',
    color: deepSquidInk,
    fontSize: 20,
    fontWeight: '500',
  },
  sectionFooter: {
    fontFamily: 'Andale Mono',
    width: '100%',
    paddingHorizontal: 20,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 20,

    backgroundColor: 'black',
  },
  sectionFooterLink: {
    fontFamily: 'Andale Mono',
    fontSize: 14,
    color: 'white',
    alignItems: 'baseline',
    textAlign: 'center',
  },
  sectionFooterLinkDisabled: {
    fontFamily: 'Andale Mono',
    fontSize: 14,
    color: disabledButtonColor,
    alignItems: 'baseline',
    textAlign: 'center',
  },
  navBar: {
    fontFamily: 'Andale Mono',
    marginTop: 35,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  navButton: {
    fontFamily: 'Andale Mono',
    marginLeft: 12,
    borderRadius: 4,
  },
  cell: {
    fontFamily: 'Andale Mono',
    flex: 1,
    width: '50%',
  },
  errorRow: {
    fontFamily: 'Andale Mono',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  errorRowIcon: {
    fontFamily: 'Andale Mono',
    height: 25,
    width: 25,
  },
  errorRowText: {
    fontFamily: 'Andale Mono',
    marginLeft: 10,
  },
  photo: {
    fontFamily: 'Andale Mono',
    width: '100%',
  },
  album: {
    fontFamily: 'Andale Mono',
    width: '100%',
  },
  button: {
    fontFamily: 'Andale Mono',
    backgroundColor: buttonColor,
    alignItems: 'center',
    padding: 16,
  },
  buttonDisabled: {
    fontFamily: 'Andale Mono',
    backgroundColor: disabledButtonColor,
    alignItems: 'center',
    padding: 16,
  },
  buttonText: {
    fontFamily: 'Andale Mono',
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  formField: {
    fontFamily: 'Andale Mono',
    marginBottom: 22,
  },
  input: {
    fontFamily: 'Andale Mono',
    padding: 16,
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: 'white',
    borderColor: textInputBorderColor,
    color: textInputColor,
  },
  inputLabel: {
    fontFamily: 'Andale Mono',
    marginBottom: 8,
  },
  phoneContainer: {
    fontFamily: 'Andale Mono',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    fontFamily: 'Andale Mono',
    flex: 2,
    padding: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: textInputBorderColor,
    color: textInputColor,
  },
  picker: {
    fontFamily: 'Andale Mono',
    flex: 1,
    height: 44,
  },
  pickerItem: {
    fontFamily: 'Andale Mono',
    height: 44,
  },
  signedOutMessage: {
    fontFamily: 'Andale Mono',
    textAlign: 'center',
    padding: 20,
  },
};

export default AmplifyTheme;

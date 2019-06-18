const styles = theme => ({
 root: {
   width: "100%",
   marginTop: theme.spacing.unit * 3
 },
 table: {
   minWidth: 500
 },
 tableWrapper: {
   overflowX: "auto"
 },
 tableRow: {
  cursor: 'pointer',
 },
 subject : {
  fontSize: '16px',
  fontWeigth: 'bold',
  width: '100px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
 },
 message: {
  fontSize: '12px',
  width: '100px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
 }
});

export default styles;
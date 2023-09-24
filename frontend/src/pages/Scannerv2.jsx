import React, { useState } from 'react';
import { Container, Card, CardContent, makeStyles, Grid } from '@material-ui/core';
import { QrReader } from 'react-qr-reader';

function Scannerv2() {
  const [data, setData] = useState('No result');
  const classes = useStyles();

  const handleScanWebCam = (result) => {
    if (result) {
      setData(result);
    }
  };

  return (
    <Container className={classes.container}>
      <Card>
        <h2 className={classes.title}>QR Code Scan by Webcam</h2>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <QrReader
                onResult={(result, error) => {
                  if (!!result) {
                    handleScanWebCam(result?.text);
                  }

                  if (!!error) {
                    console.info(error);
                  }
                }}
                style={{ width: '100%' }}
              />
              <p>{data}</p>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
export default Scannerv2;
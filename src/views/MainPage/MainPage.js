import React from 'react';
import { Typography, Paper, Stepper, StepLabel, Step, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CurrentReadingView from '../CurrentReadingView/CurrentReadingView';
import ChooseRoomView from '../ChooseRoomView/ChooseRoomView';

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto'
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    border: 'none',
    boxShadow: 'none'
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

function getStepContent(step) {
  switch (step) {
    case 0:
      return <ChooseRoomView />;
    case 1:
      return <CurrentReadingView />;
    default:
      throw new Error('Unknown step');
  }
}

function MainPage() {
  const classes = useStyles();
  const steps = ['Выбор помещения', 'Ввод данных'];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Журнал учёта температурно-влажностного режима
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Назад
                    </Button>
                  )}
                  {activeStep === 0 && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Вперед
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </>
  );
}

export default MainPage;

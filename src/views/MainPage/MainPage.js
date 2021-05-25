import React, { useState } from 'react';
import { Typography, Paper, Stepper, StepLabel, Step, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CurrentReadingView from '../CurrentReadingView/CurrentReadingView';
import ChooseRoomView from '../ChooseRoomView/ChooseRoomView';
import api from '../../api';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    [theme.breakpoints.up(900 + theme.spacing(2) * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
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

function MainPage() {
  const classes = useStyles();
  const steps = ['Выбор помещения', 'Ввод данных'];
  const [roomId, setRoomId] = useState('');
  const [current, setCurrent] = useState(undefined);
  const [temperature, setTemperature] = useState([]);
  const [humidity, setHumidity] = useState([]);

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    console.log(roomId);
    api.reading
      .get(roomId)
      .then(reading => {
        setCurrent(reading);
      })
      .catch(() => {
        setCurrent(undefined);
      })
      .finally(() => {
        api.readings.get(roomId, new Date() - 7, new Date()).then(readings => {
          setTemperature(
            readings.map(reading => {
              return {
                date: moment(reading.date).format('DD.MM'),
                temperature: reading.temperature
              };
            })
          );
          setHumidity(
            readings.map(reading => {
              return { date: moment(reading.date).format('DD.MM'), humidity: reading.humidity };
            })
          );
        });
        setActiveStep(activeStep + 1);
      });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <ChooseRoomView
            setRoomHandler={room => {
              setRoomId(room.target.value);
              setCurrent(undefined);
            }}
          />
        );
      case 1:
        return (
          <CurrentReadingView
            reading={current}
            room={roomId}
            updateReading={value => setCurrent(value)}
            temperature={temperature}
            humidity={humidity}
            updateReadingList={(value, isUpdate) => {
              if (isUpdate) {
                const currentDay = moment(current.date).format('DD.MM');
                setHumidity(
                  humidity.map(el => {
                    if (el.date === currentDay) {
                      el.humidity = value.humidity;
                    }
                    return el;
                  })
                );
                setTemperature(
                  temperature.map(el => {
                    if (el.date === currentDay) {
                      el.temperature = value.temperature;
                    }
                    return el;
                  })
                );
              } else {
                const currentDay = moment(new Date()).format('DD.MM');
                humidity.push({ date: currentDay, humidity: value.humidity });
                setHumidity([...humidity]);
                temperature.push({ date: currentDay, temperature: value.temperature });
                setTemperature([...temperature]);
              }
            }}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

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
                  {activeStep === 0 && roomId && (
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

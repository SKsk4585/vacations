import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';import VacationsModel from "../../../models/vacationModel";
import appConfig from "../../../utils/Config";
import "./vacationCard.css";
import { forwardRef, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface VacationCardProps {
	vacation: VacationsModel
}
const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function VacationCard(props: VacationCardProps): JSX.Element {  
 
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div className="vacationCard">
            <Card sx={{ maxWidth: 345 }} className='card'>
            <CardMedia
                sx={{ height: 140 }}
                image={appConfig.vacationImageUrl + props.vacation.vacationId}
                title={props.vacation.destination}
            />
                <Typography gutterBottom variant="h5" component="div" className='header'>
                    {props.vacation.destination}
                </Typography>
            <CardContent>

                <Typography variant="body2" color="text.secondary" className='date'>
                    <span>From: {props.vacation.startDate }   To: {props.vacation.endDate} </span> <br/>  <br/>                   
                </Typography>
                <Typography variant="body2" color="text.secondary" className='price'>                  
                    <span>Price: {props.vacation.price}$</span>
                </Typography>
            </CardContent>
            <CardActions>
            <Button variant="outlined" onClick={handleClickOpen} className='button'>
                about
            </Button>
            </CardActions>
            </Card>

            <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        
        <DialogContent className='dialog'>
          <DialogContentText  id="alert-dialog-slide-description" className='description dialog'>
            <span>{props.vacation.description}</span>

          </DialogContentText>
        </DialogContent>
        
      </Dialog>
			
        </div>
    );
}

export default VacationCard;



import "./DiscriptionButton.css";
import { forwardRef, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Typography from '@mui/material/Typography';
import appConfig from "../../../utils/Config";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';


interface DiscriptionButtonProps {
	discription: string
  destination:string
  vacationId: number
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function DiscriptionButton(prop: DiscriptionButtonProps): JSX.Element {

  const images = [
    {
      url: appConfig.vacationImageUrl + prop.vacationId,
      title: prop.destination,
      width: '100%',      
    }  
  ];
  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 100%',
  });
  
  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    backgroundSize:'cover',
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
    width: '100%'
  }));
  
  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    return (
        <div className="DiscriptionButton">
 <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                {images.map((image) => (
                  <ImageButton
                    focusRipple
                    key={image.title}
                    style={{
                      width: image.width,
                    }}
                    onClick={handleClickOpen}
                  >
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop className='MuiImageBackdrop-root' />
                <Image>
                  <Typography
                    component='span'
                    variant='subtitle1'
                    color='inherit'
                    sx={{
                      position: 'relative',
                      p: 4,
                      pt: 2,
                      pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                  >
                    {image.title}
                    <ImageMarked className='MuiImageMarked-root' />
                  </Typography>
                </Image>
              </ImageButton>
            ))}
        </Box>         
         <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            
            <DialogContent className='dialogB'>
              <DialogContentText  id="alert-dialog-slide-description" className='description dialog'>
                <span>{prop.discription}</span>
                    	
              </DialogContentText>
            </DialogContent>
            
         </Dialog>
      
			
        </div>
    );
}

export default DiscriptionButton;

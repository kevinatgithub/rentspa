import { Grid } from '@mui/material';
import Dirty from './Dirty';
import DirtyWithInitialValues from './DirtyWithInitialValues';
import IsValidAndDirty from './IsValid';
import ValidateOnMount from './ValidateOnMount';
import WhenSubmittingIsDone from './WhenSubmittingIsDone';
import WhenSubmittingWithValidate from './WhenSubmittingWithValidate';

const DisableSubmitExample = () => {
    return <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={12}>
            <IsValidAndDirty />
        </Grid>
        <Grid item xs={12}>
            <ValidateOnMount />
        </Grid>
        <Grid item xs={12}>
            <Dirty />
        </Grid>
        <Grid item xs={12}>
            <DirtyWithInitialValues />
        </Grid>
        <Grid item xs={12}>
            <WhenSubmittingWithValidate />
        </Grid>
        <Grid item xs={12}>
            <WhenSubmittingIsDone />
        </Grid>
    </Grid>
}

export default DisableSubmitExample
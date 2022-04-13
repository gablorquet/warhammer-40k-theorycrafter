import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import SquadPickerComponent from './squad.picker';
import TargetPickerComponent from './target.picker';

//#region Props/State
type PickerPageProps = {
}
//#endregion

export default function PickerPageComponent (props: PickerPageProps) {

    const methods = useForm({
        defaultValues: {
            target: {
                unitId: '',
                effects: []
            },
            squad: {
                units: [],
            }
        }
    });

    return (
        <FormProvider {...methods}>
            
            <SquadPickerComponent/>

            <TargetPickerComponent/>

        </FormProvider>
    )
}

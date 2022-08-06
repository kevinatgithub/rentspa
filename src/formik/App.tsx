import { FC } from "react";
import ArraysExample from "./examples/ArraysExample";
import AsyncExample from "./examples/AsyncExample";
import AsyncSearchExample from "./examples/AsyncSearchExample";
import ComponentsExample from "./examples/ComponentsExample";
import DisableSubmitExample from "./examples/DisableSubmitExample/DisableSubmitExample";
import DisableValidationTriggersExample from "./examples/DisableValidationTriggersExample";
import FieldAndErrorMessageCompExample from "./examples/FieldAndErrorMessageCompExample";
import FieldArrayExample from "./examples/FieldArrayExample";
import FieldLevelValidationExample from "./examples/FieldLevelValidationExample";
import FieldRenderPropExample from "./examples/FieldRenderPropExample";
import Lab from "./examples/lab/Lab";
import ManualTriggerValidationExample from "./examples/ManualTriggerValidationExample";
import NestedObjects from "./examples/NestedObjects";
import ReinitializeExample from "./examples/ReinitializeExample";
import UseFormikExample from "./examples/UseFormikExample";
import ValidateExample from "./examples/ValidateExample";
import ValidationSchemaExample from "./examples/ValidationSchemaExample";
import WithFormikExample from "./examples/WithFormikExample";
import WithoutFormikExample from "./examples/WithoutFormikExample";
import VerticalTabs, { TabProps } from "./layout/VerticalTabs";

const App:FC = (props) => {

    const tabs: any[] = [
        {
            comp: <WithoutFormikExample />,
            key: "Without Formik"
        },{
            comp: <WithFormikExample />,
            key: "With Formik & Yup"
        },{
            comp: <UseFormikExample />,
            key: "Use Formik"
        },
        {
            comp: <ValidateExample />,
            key: "Validate"
        },
        {
            comp: <ValidationSchemaExample />,
            key: "Validation Schema"
        },
        {
            comp: <ComponentsExample />,
            key: "Formik Components"
        },
        {
            comp: <FieldAndErrorMessageCompExample />,
            key: "Field and Error Message Components"
        },
        {
            comp: <FieldRenderPropExample />,
            key: "Field Render Props"
        },
        {
            comp: <NestedObjects />,
            key: "Nested Objects"
        },
        {
            comp: <ArraysExample />,
            key: "Arrays"
        },
        {
            comp: <FieldArrayExample />,
            key: "Field Array Component"
        },
        {
            comp: <DisableValidationTriggersExample />,
            key: "Disable Validation Triggers"
        },
        {
            comp: <FieldLevelValidationExample />,
            key: "Field Level Validation"
        },
        {
            comp: <ManualTriggerValidationExample />,
            key: "Manual Trigger Validation"
        },
        {
            comp: <DisableSubmitExample />,
            key: "Disabling Submit"
        },
        {
            comp: <ReinitializeExample />,
            key: "Reinitialize Example"
        },
        {
            comp: <AsyncExample />,
            key: "Async Example 1"
        },
        {
            comp: <AsyncSearchExample />,
            key: "Async Example 2"
        },
    ]
    return <>
        <VerticalTabs tabs={tabs.map((t,i) => ({ ...t, index : i}))} />
    </>;
}

export default App;
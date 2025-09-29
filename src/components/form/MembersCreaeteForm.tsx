import { Form, Input, DatePicker, Button, message } from "antd";
import { t } from "../../utils/i18n";
import "../../styles/form.css";
import { BrushCleaningIcon, CheckCircleIcon } from "lucide-react";


// Account creation form component using Ant Design
// Labels, messages and button texts are fetched from i18n translations object
// Required fields: name, date of birth
// Optional fields: email, gender


export default function MembersCreateForm() {
    const [form] = Form.useForm();


    const onFinish = (values: any) => {
        const formatted = {
            ...values,
            Dob: values.Dob ? values.Dob.format("YYYY-MM-DD") : undefined,
        };


        console.log("Submit payload:", formatted);
        message.success(t.messages.AccountCreated);
        form.resetFields();
    };


    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
        message.error(t.messages.FillRequiredFields);
    };


    return (
        <div className="form-container">
            <div className="form-card">
                <Form
                    form={form}
                    layout="vertical"
                    name="accounts_create"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}>
                    <Form.Item
                        label={t.texts.Name}
                        name="name"
                        rules={[{ required: true, message: t.messages.NameRequired }]}>
                        <Input placeholder={t.texts.NamePlaceholder} />
                    </Form.Item>
                    <Form.Item
                        label={t.texts.DateOfBirth}
                        name="date_ob"
                        rules={[{ required: true, message: t.messages.DobRequired }]}>
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        label={t.texts.Email}
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: t.messages.InvalidEmail,
                            },
                        ]}>
                        <Input placeholder={t.texts.EmailPlaceholder} />
                    </Form.Item>  
                    <Form.Item>
                        <div className="form-buttons">
                            <Button type="primary" htmlType="submit">
                                <CheckCircleIcon size={14}/>
                                {t.buttons.Create}
                            </Button>
                            <Button htmlType="button" onClick={() => form.resetFields()}>
                                <BrushCleaningIcon size={14}/>
                                {t.buttons.Clear}
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
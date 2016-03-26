//用于校验各个字段
const validateMixin ={
    validateFormEdit:function(){
        const  getFieldProps  = this.props.form.getFieldProps;
        let staffInfo = this.state.model;
        //用户名的校验
        const nameProps = getFieldProps('name',{
            rules: [
                { required: true ,message:'用户名不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //职务的校验
        const jobProps = getFieldProps('job',{
            rules: [
                { required: true ,message:'职务不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //编码
        const codeProps= getFieldProps('code',{
            rules: [
                { required: true ,message:'编码不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //身份证
        const idNumber = getFieldProps('idNumber',{
            rules: [
                { required: true ,message:'身份证号码不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //手机
        const phoneNumber = getFieldProps('phoneNumber',{
            rules: [
                { required: true ,message:'手机号码不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //驾驶证号
        const drivingLicense = getFieldProps('drivingLicense',{
            rules: [
                { required: true ,message:'驾驶证号不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //有效期
        const validDate = getFieldProps('validDate',{
            rules: [
                { required: true ,message:'有效期不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //发证机关
        const authorizedBy = getFieldProps('authorizedBy',{
            rules: [
                { required: true ,message:'发证机关不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //年审到期
        const annualExamination = getFieldProps('annualExamination',{
            rules: [
                { required: true ,message:'年审到期不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //领证日期
        const startLicenseData = getFieldProps('startLicenseData',{
            rules: [
                { required: true ,message:'领证日期不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //准驾车型
        const licenseType = getFieldProps('licenseType',{
            rules: [
                { required: true ,message:'准驾车型不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //
        return{
            getFieldProps:getFieldProps,
            staffInfo:staffInfo,
            nameProps:nameProps,
            jobProps:jobProps,
            codeProps:codeProps,
            phoneNumber:phoneNumber,
            licenseType:licenseType,
            startLicenseData:startLicenseData,
            annualExamination:annualExamination,
            authorizedBy:authorizedBy,
            validDate:validDate,
            idNumber:idNumber,
            drivingLicense:drivingLicense
        }
    },
    validateFormAdd:function(){
        const  getFieldProps  = this.props.form.getFieldProps;
        //用户名的校验
        const nameProps = getFieldProps('name',{
            rules: [
                { required: true ,message:'用户名不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //职务的校验
        const jobProps = getFieldProps('job',{
            rules: [
                { required: true ,message:'职务不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //编码
        const codeProps= getFieldProps('code',{
            rules: [
                { required: true ,message:'编码不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //身份证
        const idNumber = getFieldProps('idNumber',{
            rules: [
                { required: true ,message:'身份证号码不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //手机
        const phoneNumber = getFieldProps('phoneNumber',{
            rules: [
                { required: true ,message:'手机号码不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //驾驶证号
        const drivingLicense = getFieldProps('drivingLicense',{
            rules: [
                { required: true ,message:'驾驶证号不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //有效期
        const validDate = getFieldProps('validDate',{
            rules: [
                { required: true ,message:'有效期不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //发证机关
        const authorizedBy = getFieldProps('authorizedBy',{
            rules: [
                { required: true ,message:'发证机关不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //年审到期
        const annualExamination = getFieldProps('annualExamination',{
            rules: [
                { required: true ,message:'年审到期不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //领证日期
        const startLicenseData = getFieldProps('startLicenseData',{
            rules: [
                { required: true ,message:'领证日期不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //准驾车型
        const licenseType = getFieldProps('licenseType',{
            rules: [
                { required: true ,message:'准驾车型不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //
        return{
            getFieldProps:getFieldProps,
            nameProps:nameProps,
            jobProps:jobProps,
            codeProps:codeProps,
            phoneNumber:phoneNumber,
            licenseType:licenseType,
            startLicenseData:startLicenseData,
            annualExamination:annualExamination,
            authorizedBy:authorizedBy,
            validDate:validDate,
            idNumber:idNumber,
            drivingLicense:drivingLicense
        }
    }
};
export {validateMixin}

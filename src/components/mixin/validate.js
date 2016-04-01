//用于校验各个字段
const validateMixin ={
    validateFormEdit:function(){
        const  getFieldProps  = this.props.form.getFieldProps;
        //用户名的校验
        const name = getFieldProps('name',{
            rules: [
                { required: true ,message:'用户名不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //职务的校验
        const duties = getFieldProps('duties',{
            rules: [
                { required: true ,message:'职务不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //编码
        const code= getFieldProps('code',{
            rules: [
                { required: true ,message:'编码不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //身份证
        const IDCardNo = getFieldProps('IDCardNo',{
            rules: [
                { required: true ,message:'身份证号码不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //手机
        const tel = getFieldProps('tel',{
            rules: [
                { required: true ,message:'手机号码不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //驾驶证号
        const licenseNo = getFieldProps('licenseNo',{
            rules: [
                { required: true ,message:'驾驶证号不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //有效期
        const expirationDate = getFieldProps('expirationDate',{
            rules: [
                { required: true ,message:'有效期不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //发证机关
        const licensingOrganization = getFieldProps('licensingOrganization',{
            rules: [
                { required: true ,message:'发证机关不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //年审到期
        const auditDate = getFieldProps('auditDate',{
            rules: [
                { required: true ,message:'年审到期不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //领证日期
        const licensingDate = getFieldProps('licensingDate',{
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
            name:name,
            duties:duties,
            code:code,
            tel:tel,
            licenseType:licenseType,
            licensingDate:licensingDate,
            auditDate:auditDate,
            licensingOrganization:licensingOrganization,
            expirationDate:expirationDate,
            IDCardNo:IDCardNo,
            licenseNo:licenseNo
        }
    },
    validateFormAdd:function(){
        const  getFieldProps  = this.props.form.getFieldProps;
        //用户名的校验
        const name = getFieldProps('name',{
            rules: [
                { required: true ,message:'用户名不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //职务的校验
        const duties = getFieldProps('duties',{
            rules: [
                { required: true ,message:'职务不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //编码
        const code= getFieldProps('code',{
            rules: [
                { required: true ,message:'编码不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //身份证
        const IDCardNo = getFieldProps('IDCardNo',{
            rules: [
                { required: true ,message:'身份证号码不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //手机
        const tel = getFieldProps('tel',{
            rules: [
                { required: true ,message:'手机号码不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //驾驶证号
        const licenseNo = getFieldProps('licenseNo',{
            rules: [
                { required: true ,message:'驾驶证号不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //有效期
        const expirationDate = getFieldProps('expirationDate',{
            rules: [
                { required: true ,message:'有效期不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //发证机关
        const licensingOrganization = getFieldProps('licensingOrganization',{
            rules: [
                { required: true ,message:'发证机关不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //年审到期
        const auditDate = getFieldProps('auditDate',{
            rules: [
                { required: true ,message:'年审到期不能为空'}
            ],
            trigger: ['onBlur', 'onChange']
        });
        //领证日期
        const licensingDate = getFieldProps('licensingDate',{
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
            name:name,
            duties:duties,
            code:code,
            tel:tel,
            licenseType:licenseType,
            licensingDate:licensingDate,
            licensingOrganization:licensingOrganization,
            auditDate:auditDate,
            expirationDate:expirationDate,
            IDCardNo:IDCardNo,
            licenseNo:licenseNo
        }
    }
};
export {validateMixin}

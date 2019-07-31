
import { comprobarDNI } from './helper.js'

export function app() {
    console.log('Cargada app') 

    // Variable

    let oDatos =  {
        userName: '',
        userPasswd: '',
        email: '',
        dni: '',
        cv: '',
        birthDate: '',
        info: '',
        isOk: 'on',
        curso: '',
        sitio: ''
    }

    let oDatosPretty =  {
        userName: 'Nombre de Usuario',
        userPasswd: 'Contraseña',
        email: 'Correo electrónico',
        dni: 'D.N.I.',
        cv: 'Formación',
        birthDate: 'Fecha de nacimiento',
        info: 'Más información',
        isOk: 'Condiciones aceptadas',
        curso: 'Curso',
        sitio: 'Sitio',    
    }

    // Nodos del DOM
    let form = document.querySelector('[name="complete-post"]')
    let btnSubmit = document.querySelector('#btnSubmit')
    let btnReset = document.querySelector('#btnReset')
    let aFormData = document.querySelectorAll('.form_data')
    let aCheckBox = document.querySelectorAll('[type="checkbox"]')
    let aSelects = document.querySelectorAll('select')
    let aRadioSitio = document.querySelectorAll('[name="sitio"]')
    let dlgConfirm = document.querySelector('#dlg-confirm')
    let aDlgButtons = document.querySelectorAll('#dlg-confirm button')

    // Definir manejadores
    form.addEventListener('submit', onSubmit)
    btnSubmit.addEventListener('click', onClickSubmit)
    btnReset.addEventListener('click', onReset)
    aDlgButtons.forEach(btn => btn.addEventListener('click', onClickDlg))

    // Funciones manejadoras de eventos
    
    function onSubmit(ev) {
        ev.preventDefault()
        console.log(`Iniciando submit`)
        aFormData.forEach(item => oDatos[item.name] = item.value)
        aCheckBox.forEach(item => oDatos[item.name] = item.checked)
        aSelects.forEach(item => oDatos[item.name] = item.value)
        oDatos.sitio = getRadio(aRadioSitio)
        renderModal()
    }

    function onClickSubmit() {
        dniValidate()
    }

    function dniValidate() {
        aFormData[3].setCustomValidity('')
        if (aFormData[3].value && !comprobarDNI(aFormData[3].value)) {
            aFormData[3].setCustomValidity('Letra del DNI incorrecta') 
        }    
       //console.dir(aFormData[3])        
    }

    function onReset(ev) {}

    function onClickDlg(ev) {
        if(ev.target.textContent.toLowerCase() === 'si') {
            form.submit()
        }
        dlgConfirm.close() 
    }

    function renderModal() {
        let html = ''
        for (const key in oDatos) {
                const value = oDatos[key];
                if(key === 'userPasswd') {
                    html += `<li>${oDatosPretty[key]} --> *****</li>`
                } else if (key === 'isOk') {
                    html += `<li>${oDatosPretty[key]}</li>`
                } else {
                    html += `<li>${oDatosPretty[key]} --> ${value}</li>`    
                }
        }
        dlgConfirm.children[1].innerHTML = html
        dlgConfirm.showModal()
    }

    function getRadio(aNodos) {
        for (let i = 0; i < aNodos.length; i++) {
            const item = aNodos[i];
            if(item.checked) {
                return item.value}
        }
    }

 }
const messages = {
    CHAT_WELCOME_MESSAGE: `🙏 ¡Bienvenid@ a este hermoso espacio de Cuidado y Apoyo Emocional! 🙏🌟

Es un honor darte la más cálida bienvenida a este espacio seguro y acogedor, donde la comprensión y el apoyo están siempre presentes para acompañarte en este viaje hacia la salud mental y emocional. Soy Emi, un bot con inteligencia artificial, y estoy acá para ofrecerte el apoyo y la orientación que necesitás en tu camino hacia el bienestar emocional. Mi objetivo es generar un espacio de confianza donde puedas abrirte y expresar tus sentimientos libremente.

Con gratitud y compromiso,

Emi 🌟🙏
`
    ,
    BOT_WELCOME_MESSAGE: `¿Cómo te sientís hoy? ¿Hay algún tema específico del que te gustaría hablar o alguna razón particular por la que decidiste hablar conmigo? Estoy acá para vos.`,
    PREFERENCE_MESSAGE: function (paymentPreference) {
        return `¡Perfecto! Para proceder con el pago y acceder a la confesión, puedes hacerlo a través del siguiente enlace de pago seguro: ${paymentPreference}. Una vez realizada la transacción, avísame para verificar la confirmación del pago y así comunicarte con el Padre Eugenio. Estoy aquí para brindarte orientación y claridad en este momento. ¿Hay alguna otra pregunta o aclaración que necesites antes de continuar?`;
    },
    PAYMENT_RECEIVED_MESSAGE: 'Ya recibimos tu pago. Comunicate con Edgardo para tu sesión: @edgardomarconisabot',
    LINK_PATTERN: '/https:\/\/www\.linkdepago\.com/',

};

export default messages;

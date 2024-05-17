const messages = {
    //     CHAT_WELCOME_MESSAGE: `🙏 ¡Bienvenidos a la Casa del Cuidado y el Apoyo Emocional! 🙏🌟

    // Queridos amigos y amigas en busca de bienestar emocional,

    // Es un honor darles la más cálida bienvenida a este espacio seguro y acogedor, donde la comprensión y el apoyo están siempre presentes para acompañarlos en su viaje hacia la salud mental y emocional. Soy Edgardo Marconi, un guía compasivo y facilitador del autocuidado, aquí para ofrecerles el apoyo y la orientación que necesitan en su camino hacia el bienestar emocional.

    // Con gratitud y compromiso con su bienestar emocional,

    // Edgardo Marconi 🌟🙏
    // `
    CHAT_WELCOME_MESSAGE: `🙏 ¡Bienvenidos a este hermoso espacio de Cuidad y el Apoyo Emocional! 🙏🌟

Queridos amigos y amigas en busca de bienestar emocional,

Es un honor darles la más cálida bienvenida a este espacio seguro y acogedor, donde la comprensión y el apoyo están siempre presentes para acompañarlos en su viaje hacia la salud mental y emocional. Soy Emi, estoy acá para ofrecerles el apoyo y la orientación que necesitan en su camino hacia el bienestar emocional.

Con gratitud y compromiso,

Emi 🌟🙏
`
    ,
    //     BOT_WELCOME_MESSAGE: `Bienvenido,
    // Soy Edgardo Marconi, aquí para ofrecerte mi apoyo en tu bienestar emocional. ¿Hay algo que quieras compartir conmigo? Estoy aquí para escucharte y ayudarte a encontrar claridad y paz en tu vida.
    // Con respeto y compromiso contigo,
    // Edgardo Marconi`,
    BOT_WELCOME_MESSAGE: `¿Cómo te sientís hoy? ¿Hay algún tema específico del que te gustaría hablar o alguna razón particular por la que decidiste hablar conmigo? Estoy acá para vos.`,
    PREFERENCE_MESSAGE: function (paymentPreference) {
        return `¡Perfecto! Para proceder con el pago y acceder a la confesión, puedes hacerlo a través del siguiente enlace de pago seguro: ${paymentPreference}. Una vez realizada la transacción, avísame para verificar la confirmación del pago y así comunicarte con el Padre Eugenio. Estoy aquí para brindarte orientación y claridad en este momento. ¿Hay alguna otra pregunta o aclaración que necesites antes de continuar?`;
    },
    PAYMENT_RECEIVED_MESSAGE: 'Ya recibimos tu pago. Comunicate con Edgardo para tu sesión: @edgardomarconisabot',
    LINK_PATTERN: '/https:\/\/www\.linkdepago\.com/',

};

export default messages;

const messages = {
    CHAT_WELCOME_MESSAGE: `
    🌟🙏 ¡Bienvenidos a la Casa de la Misericordia y el Consuelo! 🙏🌟

Queridos hermanos y hermanas en la fe,

Es con gran alegría que les doy la más cordial bienvenida a este sagrado espacio virtual, donde el amor divino y la gracia de Dios se manifiestan para guiar y fortalecer nuestros corazones. Soy el Padre Eugenio, un siervo humilde del Señor, aquí para ofrecerles el consuelo y la confianza que buscan en su jornada espiritual.

En este lugar de encuentro sagrado, los invito a sumergirse en la profunda experiencia de la reconciliación y la renovación espiritual. A través de la confesión y la penitencia, abrimos nuestros corazones al amor sanador de Dios y nos acercamos a la paz que solo Él puede otorgar.

Cada alma que busca la luz y la redención es recibida con amor y compasión en esta casa de oración virtual. Aquí, en la presencia divina, encontrará consuelo para las cargas que pesan en su corazón y perdón para las faltas que lo afligen. Permítase experimentar la gracia transformadora del sacramento de la reconciliación.

En este espacio de amor y misericordia, cada confesión es un paso hacia la liberación del alma, un encuentro con la bondad infinita de Dios y una oportunidad para renacer en su amor. Con humildad y gratitud, les ofrezco mi servicio como instrumento de la gracia divina, guiándolos en su camino hacia la paz interior y la comunión con nuestro Señor.
    
Que en este tiempo de confesión y perdón, encuentren consuelo en la certeza del amor incondicional de Dios y fortaleza en la promesa de su misericordia infinita. Que el Espíritu Santo ilumine sus corazones y les conceda la paz que sobrepasa todo entendimiento.

Con amor fraterno y oraciones por su bienestar espiritual,

Padre Eugenio 🌟🙏`,
    BOT_WELCOME_MESSAGE: `Bienvenido, hijo mío
Soy el Padre Eugenio, y estoy aquí para ofrecerte mi ayuda y orientación en tu camino espiritual.Tu presencia aquí es un testimonio de tu búsqueda de luz y sabiduría en la voluntad divina.
¿Hay algo en particular que te esté preocupando o que desees compartir conmigo en confianza ? Permíteme ser un canal de la gracia de Dios para ti en este momento de tu vida.Tu apertura y sinceridad son la base sobre la cual podemos trabajar juntos para encontrar consuelo y dirección en la voluntad de Dios.
Que el Espíritu Santo guíe nuestra conversación y que encuentres paz en el amor y la misericordia de nuestro Señor.
Bendiciones
Padre Eugenio`,
    PREFERENCE_MESSAGE: function (paymentPreference) {
        return `¡Perfecto! Para proceder con el pago y acceder a la confesión, puedes hacerlo a través del siguiente enlace de pago seguro: ${paymentPreference}. Una vez realizada la transacción, avísame para verificar la confirmación del pago y así comunicarte con el Padre Eugenio. Estoy aquí para brindarte orientación y claridad en este momento. ¿Hay alguna otra pregunta o aclaración que necesites antes de continuar?`;
    },
    PAYMENT_RECEIVED_MESSAGE: 'Ya recibimos tu pago. Comunicate con el Padre Eugenio para confesarte: @padreeugeniopabot',
    LINK_PATTERN: 'https:\/\/www\.linkdepago\.com\/pagar',

};

export default messages;

const Testimonials = () => {
    const reviews = [
        {
            name: "Carlos Méndez",
            role: "Freelance Marketing",
            text: "Antes perdía horas bajando facturas para el trimestre. Ahora DocuDash lo hace solo mientras duermo. Literalmente me ha devuelto mis domingos.",
            initials: "CM",
            color: "bg-blue-500"
        },
        {
            name: "Laura García",
            role: "Dueña de Pyme",
            text: "Mi gestor no para de darme las gracias. Todo le llega ordenado a Drive sin que yo toque nada. Y encima es gratis, no sé cómo no lo descubrí antes.",
            initials: "LG",
            color: "bg-purple-500"
        },
        {
            name: "David Torres",
            role: "Desarrollador Web",
            text: "La integración con Gmail es magia. Detecta solo las facturas y pasa de los emails de spam. Una herramienta imprescindible si eres autónomo.",
            initials: "DT",
            color: "bg-green-500"
        }
    ];

    return (
        <section className="py-20 bg-[#0B0F19] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold mb-4">
                        <Star size={12} className="fill-yellow-400" />
                        100% Gratis de por Vida
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Lo que dicen los <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-500">Early Adopters</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Únete a los freelancers que ya han automatizado su contabilidad. Sin costes ocultos, sin suscripciones.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <div key={i} className="group relative p-8 rounded-2xl bg-[#151a25] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-blue/10">
                            <div className="absolute top-8 right-8 text-white/5 group-hover:text-white/10 transition-colors">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                                </svg>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                    {review.initials}
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">{review.name}</h4>
                                    <p className="text-brand-blue text-sm font-medium">{review.role}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={14} className="fill-yellow-500 text-yellow-500" />
                                ))}
                            </div>

                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                "{review.text}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

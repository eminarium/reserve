class Shift < ApplicationRecord

    # Validations

    validates   :title,       
                length: { minimum: 3 }, 
                presence: true,
                message: "Seans ady hökman girizilmeli we azyndan 3 belgi bolmaly..."

    validates   :start_time,  
                presence: true,
                message: "Başlanýan senesi hökman saýlanmaly..."

    validates   :end_time,    
                presence: true,
                message: "Tamamlanýan wagty hökman saýlanmaly..."

    # Associations

    has_many :reservations
end

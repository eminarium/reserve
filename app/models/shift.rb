class Shift < ApplicationRecord

    # DB Fields

    # title         :string
    # start_time    :time
    # end_time      :time
    # notes         :text


    # Validations

    validates   :title,       
                length: { minimum: 3 }, 
                presence: true,
                uniqueness: true
                message: "Seans ady hökman girizilmeli, öň gaýtalanmaýan we azyndan 3 belgi bolmaly..."

    validates   :start_time,  
                presence: true,
                message: "Başlanýan senesi hökman saýlanmaly..."

    validates   :end_time,    
                presence: true,
                message: "Tamamlanýan wagty hökman saýlanmaly..."

    # Associations

    has_many :reservations
end

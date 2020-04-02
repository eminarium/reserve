class Season < ApplicationRecord

    # Validations
    validates   :title,           
                length: { minimum: 3 }, 
                presence: true,
                uniqueness: true,
                message: "Tapgyr ady hökman girizilmeli, öň ulanylmadyk we azyndan 3 belgi bolmaly..."

    validates   :order_no,        
                numericality: { only_integer: true }, 
                presence: true,
                uniqueness: true,
                message: "Tapgyr tertip belgisi hökman girizilmeli we gaýtalanmaýan san bolmaly..."

    validates   :start_date,      
                presence: true,
                message: "Başlanýan wagty hökman girizilmeli..."

    validates   :end_date,        
                presence: true,
                message: "Tamamlanýan wagty hökman girizilmeli..."

    validates   :return_deadline, 
                presence: true,
                message: "Töleg gaýtarma möhleti hökman girizilmeli..."

    # Associations

    has_many :reservations
    has_many :subject_tests
end

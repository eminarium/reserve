class SubjectCategory < ApplicationRecord

    # Validations

    validates   :title,   
                length: { minimum: 3 }, 
                presence: true,
                message: "Ders görnüşiniň ady hökman girizilmeli we azyndan 3 belgi bolmaly..."

    validates   :is_kids, 
                presence: true,
                message: "Çaga topara degişlidigi baradaky bellik hökman belli edilmeli..."

    # Associations

    has_many :subjects
end

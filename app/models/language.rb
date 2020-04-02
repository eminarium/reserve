class Language < ApplicationRecord

    # Validations

    validates   :title, 
                length: { minimum: 2 },
                presence: true,
                uniqueness: true,
                message: "Diliň at tarypy hökman girizilmeli, bazada öň bolmaýan we azyndan 2 belgiden ybarat bolmaly..."


    # Associations

    has_many: subjects
end

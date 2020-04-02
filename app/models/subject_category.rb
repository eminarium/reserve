class SubjectCategory < ApplicationRecord

    # Validations

    validates :title,   length: { minimum: 3 }, presence: true
    validates :is_kids, presence: true

    # Associations

    has_many :subjects
end

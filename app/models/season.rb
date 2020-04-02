class Season < ApplicationRecord

    # Validations
    validates :title,           length: { minimum: 3 }, presence: true
    validates :order_no,        numericality: { only_integer: true }, presence: true
    validates :start_date,      presence: true
    validates :end_date,        presence: true
    validates :return_deadline, presence: true
end

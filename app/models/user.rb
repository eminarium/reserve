class User < ApplicationRecord

  # DB Fields

  # username  :string
  # email     :integer
  # role      :text

  # Roles
  ROLES = %i[admin registrar observer]  

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  # Validations

  validates :email, uniqueness: true
  validates :username, uniqueness: true

  devise :database_authenticatable, :authentication_keys => [:username]
  devise :rememberable, :validatable
  devise :jwt_authenticatable, jwt_revocation_strategy: JwtBlacklist

  
  # Associations

  has_many :applicants
  has_many :languages
  has_many :reservations
  has_many :seasons
  has_many :shifts
  has_many :subject_categories
  has_many :subject_tests
  has_many :subjects
end

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  belongs_to :role

  validates_presence_of :name, :role_id

  default_scope { order('name ASC') }

  def role?(role_sym)
    role.name.downcase.gsub(/( )/, '_').to_sym == role_sym
  end

end

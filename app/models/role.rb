class Role < ActiveRecord::Base
  has_and_belongs_to_many :users, :join_table => :roles_users
  belongs_to :resource, :polymorphic => true
  
  default_scope { order('name ASC') }
end

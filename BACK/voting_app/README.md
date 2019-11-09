# README

## BIENVENU

Etape pour ajouter des donnees fake:

    cd /BACK/voting_app
    rails c
    v = Voter.new first_name: 'Rakoto', last_name: 'Naivo', cin: '0000000000000'
    v.save
    v._keywords

v = Voter.new first_name: 'Rakoto', last_name: 'Naivo', cin: '0000000000000'
v = Voter.new first_name: 'Rabe', last_name: 'holdin', cin: '0000000000001'
v = Voter.new first_name: 'Rasoa', last_name: 'kininike', cin: '0000000000002'
v = Voter.new first_name: 'Rakotosoa', last_name: 'hary', cin: '0000000000003'
v = Voter.new first_name: 'Rabernary', last_name: 'toky', cin: '0000000000004'
v = Voter.new first_name: 'Rakotonandrasana', last_name: 'rindra', cin: '0000000000005'
v = Voter.new first_name: 'Rabetokotany', last_name: 'tendry', cin: '0000000000006'
v = Voter.new first_name: 'Rasendrahasina', last_name: 'mamy', cin: '0000000000007'
v = Voter.new first_name: 'Rakotofitiavana', last_name: 'fitia', cin: '0000000000008'
v = Voter.new first_name: 'Rakotosolofo', last_name: 'diamondra', cin: '0000000000009'
v = Voter.new first_name: 'Fitahiantsoa', last_name: 'rova', cin: '00000000000010'

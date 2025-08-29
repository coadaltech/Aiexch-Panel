"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
    Search,
    Filter,
    MoreHorizontal,
    Plus,
    Edit,
    Trash2,
    Play,
    Pause,
    Trophy,
    Users,
    DollarSign,
    Target,
    Award,
} from "lucide-react"

// Mock tournament data
const mockTournaments = [
    {
        id: "1",
        name: "Cyber Strike World Championship",
        game: "Cyber Strike Championship",
        status: "live",
        participants: 128,
        maxParticipants: 128,
        prizePool: "₹1,00,000",
        startDate: "2024-08-25",
        endDate: "2024-08-27",
        entryFee: "₹500",
        format: "Single Elimination",
        currentRound: "Quarter Finals",
        progress: 75,
        winner: null,
    },
    {
        id: "2",
        name: "Speed Racing Grand Prix",
        game: "Speed Racing League",
        status: "upcoming",
        participants: 64,
        maxParticipants: 64,
        prizePool: "₹50,000",
        startDate: "2024-08-30",
        endDate: "2024-09-01",
        entryFee: "₹300",
        format: "Round Robin",
        currentRound: "Registration",
        progress: 0,
        winner: null,
    },
    {
        id: "3",
        name: "Cricket Masters Cup",
        game: "Cricket Master",
        status: "completed",
        participants: 32,
        maxParticipants: 32,
        prizePool: "₹25,000",
        startDate: "2024-08-15",
        endDate: "2024-08-18",
        entryFee: "₹200",
        format: "Single Elimination",
        currentRound: "Completed",
        progress: 100,
        winner: "CricketKing_Pro",
    },
    {
        id: "4",
        name: "Space Conquest Battle",
        game: "Space Conquest War",
        status: "cancelled",
        participants: 16,
        maxParticipants: 64,
        prizePool: "₹30,000",
        startDate: "2024-08-20",
        endDate: "2024-08-22",
        entryFee: "₹400",
        format: "Double Elimination",
        currentRound: "Cancelled",
        progress: 0,
        winner: null,
    },
]

export default function TournamentManagement() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedTournament, setSelectedTournament] = useState<(typeof mockTournaments)[0] | null>(null)
    const [isAddTournamentOpen, setIsAddTournamentOpen] = useState(false)

    const filteredTournaments = mockTournaments.filter((tournament) => {
        const matchesSearch =
            tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tournament.game.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || tournament.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "live":
                return <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">Live</Badge>
            case "upcoming":
                return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Upcoming</Badge>
            case "completed":
                return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Completed</Badge>
            case "cancelled":
                return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Cancelled</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gaming-card-gradient border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Tournaments</CardTitle>
                        <Trophy className="h-4 w-4 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-accent">3</span> ending today
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gaming-card-gradient border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
                        <Users className="h-4 w-4 text-secondary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,456</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-secondary">+18%</span> from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gaming-card-gradient border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Prize Pool</CardTitle>
                        <DollarSign className="h-4 w-4 text-accent" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹5.2L</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-accent">+25%</span> this month
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-gaming-card-gradient border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                        <Target className="h-4 w-4 text-secondary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">94%</div>
                        <p className="text-xs text-muted-foreground">
                            <span className="text-secondary">+2%</span> from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Tournament Management Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <CardTitle>Tournament Management</CardTitle>
                            <CardDescription>Create and manage gaming tournaments</CardDescription>
                        </div>
                        <Dialog open={isAddTournamentOpen} onOpenChange={setIsAddTournamentOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-accent hover:bg-accent/90">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create Tournament
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Create New Tournament</DialogTitle>
                                    <DialogDescription>Set up a new tournament for players to compete.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="tournamentName" className="text-right">
                                            Name
                                        </Label>
                                        <Input id="tournamentName" placeholder="Tournament name" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="game" className="text-right">
                                            Game
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select game" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="cyber-strike">Cyber Strike Championship</SelectItem>
                                                <SelectItem value="speed-racing">Speed Racing League</SelectItem>
                                                <SelectItem value="cricket-master">Cricket Master</SelectItem>
                                                <SelectItem value="space-conquest">Space Conquest War</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="prizePool" className="text-right">
                                            Prize Pool
                                        </Label>
                                        <Input id="prizePool" placeholder="₹10,000" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="maxParticipants" className="text-right">
                                            Max Players
                                        </Label>
                                        <Input id="maxParticipants" type="number" placeholder="64" className="col-span-3" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="entryFee" className="text-right">
                                            Entry Fee
                                        </Label>
                                        <Input id="entryFee" placeholder="₹100" className="col-span-3" />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className="bg-accent hover:bg-accent/90">
                                        Create Tournament
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search tournaments by name or game..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="live">Live</SelectItem>
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tournaments Table */}
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tournament</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Participants</TableHead>
                                    <TableHead>Prize Pool</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Dates</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTournaments.map((tournament) => (
                                    <TableRow key={tournament.id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">{tournament.name}</div>
                                                <div className="text-sm text-muted-foreground">{tournament.game}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(tournament.status)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-1">
                                                <Users className="w-4 h-4 text-muted-foreground" />
                                                <span>
                                                    {tournament.participants}/{tournament.maxParticipants}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium text-accent">{tournament.prizePool}</TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="text-sm">{tournament.currentRound}</div>
                                                <Progress value={tournament.progress} className="h-2 w-20" />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div>{tournament.startDate}</div>
                                                <div className="text-muted-foreground">to {tournament.endDate}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => setSelectedTournament(tournament)}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    {tournament.status === "upcoming" && (
                                                        <DropdownMenuItem>
                                                            <Play className="mr-2 h-4 w-4" />
                                                            Start Tournament
                                                        </DropdownMenuItem>
                                                    )}
                                                    {tournament.status === "live" && (
                                                        <DropdownMenuItem>
                                                            <Pause className="mr-2 h-4 w-4" />
                                                            Pause Tournament
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem className="text-destructive">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Cancel Tournament
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Tournament Details Dialog */}
            <Dialog open={!!selectedTournament} onOpenChange={() => setSelectedTournament(null)}>
                <DialogContent className="sm:max-w-[700px]">
                    {selectedTournament && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="flex items-center space-x-2">
                                    <Trophy className="w-5 h-5 text-accent" />
                                    <span>{selectedTournament.name}</span>
                                </DialogTitle>
                                <DialogDescription>Tournament details and management</DialogDescription>
                            </DialogHeader>

                            <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="participants">Participants</TabsTrigger>
                                    <TabsTrigger value="bracket">Bracket</TabsTrigger>
                                    <TabsTrigger value="settings">Settings</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Game</Label>
                                            <div className="text-sm">{selectedTournament.game}</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Status</Label>
                                            <div>{getStatusBadge(selectedTournament.status)}</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Prize Pool</Label>
                                            <div className="text-sm font-medium text-accent">{selectedTournament.prizePool}</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Entry Fee</Label>
                                            <div className="text-sm">{selectedTournament.entryFee}</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Format</Label>
                                            <div className="text-sm">{selectedTournament.format}</div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Current Round</Label>
                                            <div className="text-sm">{selectedTournament.currentRound}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Progress</Label>
                                        <Progress value={selectedTournament.progress} className="h-3" />
                                        <div className="text-sm text-muted-foreground">{selectedTournament.progress}% Complete</div>
                                    </div>

                                    {selectedTournament.winner && (
                                        <div className="space-y-2">
                                            <Label>Winner</Label>
                                            <div className="flex items-center space-x-2">
                                                <Award className="w-4 h-4 text-accent" />
                                                <span className="font-medium">{selectedTournament.winner}</span>
                                            </div>
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="participants" className="space-y-4">
                                    <div className="text-center py-8">
                                        <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground">
                                            {selectedTournament.participants} / {selectedTournament.maxParticipants} participants registered
                                        </p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="bracket" className="space-y-4">
                                    <div className="text-center py-8">
                                        <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground">Tournament bracket will be displayed here</p>
                                    </div>
                                </TabsContent>

                                <TabsContent value="settings" className="space-y-4">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Tournament Name</Label>
                                            <Input defaultValue={selectedTournament.name} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label>Prize Pool</Label>
                                                <Input defaultValue={selectedTournament.prizePool} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Entry Fee</Label>
                                                <Input defaultValue={selectedTournament.entryFee} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Max Participants</Label>
                                            <Input type="number" defaultValue={selectedTournament.maxParticipants} />
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setSelectedTournament(null)}>
                                    Close
                                </Button>
                                <Button className="bg-accent hover:bg-accent/90">Save Changes</Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
